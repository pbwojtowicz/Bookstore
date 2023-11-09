import express from "express"
import mysql from "mysql"
import cors from "cors"

const app= express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Fdb315673c5c",
    database:"bookstore"

})

app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.json("hello, this is beckend!")
})
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books",(req,res)=>{
    const q= "INSERT INTO bookstore.books (title, description, price, cover) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover

    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book created successfully");
    });
});

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id =?"

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book deleted successfully");
    });
})
app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover

    ];

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book updated successfully");
    });
})

app.listen(8800,()=>{
    console.log("Connected to backend!")
})