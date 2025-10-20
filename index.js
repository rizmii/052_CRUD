const express = require("express");
let mysql = require("mysql2");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req, res )=>{
    res.send("Hello World");
})
app.listen(PORT,()=>
{
    console.log(`server is running on port ${PORT}`);
})
const db = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password: '',
    database: 'biodata',
    port:3306
})
db.connect((err)=>{
    if(err){
        console.error("error"+ err.stack);
        return;
    }
    console.log("connection success");

})

app.get("api/users",(req,res)=>{
    db.query('SELECT * from users',(err,results)=>{
        if (err){
            console.error('error'+ err.stack);
            res.status(500).send("error fetching users");
            return;

        }
        res.json(results);
    })
})
app.post("api/users", (req,res)=>{
    const {nama,nim,kelas}= req.body;

    if(!nama ||!nim||!kelas){
        return res.status(400).json({message:"wajib diisi"});
    }
    db.query
    {
        "INSERT INTO users (nama, nim, kelas) VALUES (?,?,?)",
        [nama,nim,kelas],
        (err, results)=>{
            if(err){
                console.error(err);
                return res.status.json({message:"Database error"});

            }
            res.status(201).json({message:"User created successfully"})
        }
    };
});
 
app.put("api/users/id",(req,res)=>
{
    const userId=req.params.id;
    const{nama,nim,kelas}= req.body;
    db.query(
        'UPDATE mahasiswa SET nama=?,nim=?,kelas=?WHERE id=?',
        [nama,nim,kelas,userId],
        (err, results)=>{
            if(err){
                console.error(err);
                return res.status(500).json({message: 'database Error'});

            }
            res.json({message: 'User updated'})
        }
    )
})

app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id=?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});

