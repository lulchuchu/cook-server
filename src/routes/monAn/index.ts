import express from "express";
import MonAnService from "../../services/monAn.service";

const monAnRoute = express();

monAnRoute.post("/", async (req, res) => {
    console.log("BODY", req.body);
    const { ten, hinhAnh, moTa, congThuc } = req.body;
    const monAn = new MonAnService({ ten, hinhAnh, moTa, congThuc });
    monAn.save();
    res.send("Tạo món thành công");
});

export default monAnRoute;
