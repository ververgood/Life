const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;
const express = require('express')
const path = require('path')
const app = express()
const Txt = require('./models/User')
let db = require('./config/mongoose')
const querystring = require("querystring");
app.use(express.static(path.join(__dirname, 'public')))
app.post('/test',(req,res)=>{
    db()
    req.on('data',function(data){
        let txt = new Txt({
            txt:querystring.parse(decodeURIComponent(data)).txt
        })
        txt.save((err)=>{
            if(err){
                res.send({
                    code:'-1',
                    data:'提交失败'
                })
            }else{
                res.send({
                    code:'1',
                    data:'提交成功'
                })
            }
        })
    })
    
})
app.get('/querytxt',(req,res)=>{
    db()
    Txt.find({},function(err,doc){
        if(err){
            res.send({
                code:'-1',
                data:'查询失败'
            })
        }else{
            res.send({
                code:'1',
                desc:'查询成功',
                data:doc
            })
        }
    })

})
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
