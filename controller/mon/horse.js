const MyError = require("../../utils/myError");
const Horse = require("../../models/Mon/Horse");
const asyncHandler = require("express-async-handler");
const paginate = require("../../utils/paginate");
const Gender = require("../../models/Gender");

exports.getHorses = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const select = req.query.select;
  const sort = req.query.sort;
  ["select", "sort", "limit", "page"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Horse);

  const horses = await Horse.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);
  // console.log(query);
  res.status(200).json({
    success: true,
    count: horses.length,
    data: horses,
    pagination,
  });
});

// genders/:horseId/horses
exports.getCategoryHorses = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const sort = req.query.sort;
  const select = req.query.select;
  let search = req.query.search;

  ["select", "sort", "page", "limit", "search"].forEach(
    (el) => delete req.query[el]
  );

  const pagination = await paginate(page, limit, Horse);

  if (!search) search = "";

  //req.query, select
  const horses = await Horse.find(
    {
      ...req.query,
      genderId: req.params.genderId,
      name: { $regex: search, $options: "i" },
    },
    select
  )
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: horses.length,
    data: horses,
    pagination,
  });
});

// genders/:horseId/horses/public
exports.getCategoryHorsesPublic = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const sort = req.query.sort;
  const select = req.query.select;
  let search = req.query.search;

  ["select", "sort", "page", "limit", "search"].forEach(
    (el) => delete req.query[el]
  );

  const pagination = await paginate(page, limit, Horse);

  if (!search) search = "";

  //req.query, select
  const horses = await Horse.find(
    {
      ...req.query,
      genderId: req.params.genderId,
      name: { $regex: search, $options: "i" },
    },
    select
  )
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: horses.length,
    data: horses,
    pagination,
  });
});

exports.createHorseM = asyncHandler(async (req, res, next) => {
  const gender = await Gender.findById(req.body.genderId);

  if (!gender) {
    throw new MyError(req.body.genderId + " ID-gender baihgui", 400);
  }

  req.body.createUser = req.userId;

  const horse = await Horse.create(req.body);

  res.status(200).json({ success: true, data: horse });
});

exports.getHorseM = asyncHandler(async (req, res, next) => {
  // const horse = await Horse.findById(req.params.id);
  const horse = await Horse.find({ _id: req.params.id });

  if (!horse) {
    throw new MyError(req.params.id + "id tei hosre oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: horse,
  });
});

exports.updateHorse = asyncHandler(async (req, res, next) => {
  const horse = await Horse.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!horse) {
    throw new MyError(req.params.id + " id tei horse oldoogue", 401);
  }

  res.status(200).json({
    success: true,
    data: horse,
  });
});

exports.deleteHorse = asyncHandler(async (req, res, next) => {
  const horse = await Horse.findByIdAndDelete(req.params.id);

  if (!horse) {
    throw new MyError(`${req.params.id} id tei horse oldoogue`, 401);
  }

  //await horse.destroy();

  res.status(200).json({
    success: true,
    data: horse,
  });
});

exports.uploadHorsePhoto = asyncHandler(async (req, res, next) => {
  // console.log( req, "=====req=====");
  const horse = await Horse.findById(req.params.id);

  if (!horse) {
    throw new MyError(req.params.id + " ID байхгүйээ.", 400);
  }

  // image upload

  const file = req.files.file;
  console.log(req, "req");
  console.log(req.files, "req  files");
  console.log(req.files.file, "req filesfilesfilesfiles");
  console.log(file, "file ********************");

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  }

  // file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    horse.photo = file.name;
    horse.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
