# 						novelAPI

### 1.code字段：这是http状态码

### 2.ststus字段：这是后台处理状态码

### 3.URI：http://localhost:3000/

### 4.错误信息：

~~~json
{
    "status": 1,
    "statusInfo": {
        "message": "服务器正忙",
        "detail": {
            "exception": "java.util.List"
        }
    }
}
status:"错误状态码"
message: "错误提示信息"
detail: {   //接口处理失败时的信息
    exception: "发生错误的位置",
    error_code: "20502"
}
~~~



### 5.获取书名：

1. API：GET/book

2. 传递的参数：

   ~~~json
   {
       id: 书籍id,
       categoryId: 分类id,
       pageNum: 1,   // 当前页码  
       pageSize: 20, // 每页条数 
   }
   //或者id,书本的id
   {
       id: ""
   }
   ~~~

   

3. 成功返回的数据：

   ~~~json
   {
       "data": [],
       "status": "0",
       "code": "200"
   }
   //data的数据形式
   data: [
       {
           "id": "书的id",
           "categoryId": "分类id",
           "categoryName": "分类名",
           name: "书名",
           author: "作者名字",
           total: "总字数",
           status: "状态",
           score: "评分",
           bookDesc: "本书描述",
           readNum: "阅读次数",
           searchNum: "搜索次数",
           imgSrc: "图片路径"
       }
   ]
   ~~~
   
4. 失败返回的数据：

   ~~~json
   {
       "status": 1,
       "statusInfo": {
           "message": "服务器正忙",
           "detail": {
               "exception": "java.util.List"
           }
       }
   }
   status:"错误状态码"
   message: "错误提示信息"
   detail: {   //接口处理失败时的信息
       exception: "发生错误的位置",
       error_code: "20502"
   }
   ~~~

### 6.修改书本信息

 1. API：PUT/book

 2. 传递的参数:

    ~~~json
    {
        "book": [
            {
                "id": "书的id",
                "categoryId": "分类id",
                name: "书名",
                author: "作者",
                total: "总字数",
                status: "状态",
                score: "评分",
                bookDesc: "本书描述",
            readNum: "阅读次数",
	            searchNum: "搜索次数",
            imgSrc: "图片路径"
            }
        ]
    }
    //id必传，且不可修改
    //name...等必传，不修改的就是原来的输入，修改的就是新的
    ~~~
    
    3. 成功时返回的数据：
    
    ~~~json
    {
        "status": "0",
    }
    
    ~~~

### 7.添加书籍

1. API：POST/book

2. 传递的参数：

   ~~~json
    {
           "categoryId": "分类id",
           name: "书名",
           author: "作者",
           status: "状态",
           bookDesc: "本书描述",
           imgSrc: "图片路径"
       }
   
   ~~~

3. 成功返回的数据：

   ~~~json
   {
       "data": {
           "bookId": ""  //返回新添加的书的id
       },
       "status": "0",
   }
   ~~~

### 8.删除书籍（一本）

1. API：DELETE/book:id

2. 成功时返回的数据

   ~~~json
   {
       "status": 0
   }
   ~~~

### 9.批量删除书籍

1. API：POST/book/delete

2. 传递的参数

   ~~~json
   data: {
       "book": [
           id1,id2,....,idn
       ]
   }
   ~~~

3. 成功时返回的数据

   ~~~json
   {
       "status": 0
   }
   ~~~

### 10.获取分类

1. API：GET/category

2. 传递的参数：

   ~~~json
   {
       pageNum: 1,   // 当前页码  
       pageSize: 20, // 每页条数 
   }
   //或者id，分类的id
   {
       id: ""
   }
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "catrgory": [
           {
               "categoryId": "",
               "name": ""
           }
       ]
   }
   //categoryId，分类id
   //name，分类名字
   ~~~

### 11.修改分类

1. API：PUT/category

2. 传递的参数：

   ~~~json
   {
       "category": [
           {
               "categoryId": "",
               "name": ""
           }
       ]
   }
   //categoryId，分类id，必传，不可修改
   //name，分类名称，必传，可修改
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": "0",
   }
   ~~~

### 12.添加分类

1. API：POST/category

2. 传递的参数：

   ~~~json
    {
       "category": {
           "name": ""
       }
   }
   //name，分类的名称，必传
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "data": {
           "categoryId": ""  //返回新添加的分类的id
       },
       "status": "0",
   }
   ~~~

### 13.删除分类（单个）

1. API：DELETE/category：id

2. 成功时返回的数据据：

   ~~~json
   {
       "status": 0
   }
   ~~~

### 14.批量删除分类

1. API：POST/category/delete

2. 传递的参数：

   ~~~json
   {
       "categoryId": [
           id1,id2,id3,...,idn
       ]
   }
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": 0
   }
   ~~~

### 15.获取章节（不包括内容）

1. API：GET/chapter：id (id是书的id)

2. 成功时返回的数据：

   ~~~json
    [
          data: {
               "id": "",
               "title": "",
               "total": "",
               "time": ""
           },
   		total: ""
       ] 
   
   //id，章节的id
   //bookId，本书的id
   //title，章节描述
   //total，本章的字数
   //time，时间
   ~~~

### 16.修改章节

1. API：PUT/chapter

2. 传递的参数：

   ~~~json
   [
           {
               "id": "",
               bookId: "",
               title: "",
               total: "",
               time: ""
           }
       ]
   
   //id，章节的id，必传，不可修改
   //bookId，书本的id，必传，不可修改
   //title，章节的标题，必传，可修改
   //total，章节的字数，必传，不可修改，自动计算的
   //time，时间
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": "0",
   }
   ~~~

### 17.添加章节

1. API：POST/chapter

2. 传递的数据：

   ~~~json
   {
       "bookId": "",
       "title": "",
       "total": "",
       "time": "",
       "content": ""
   }
   //bookId，书本的id，必传
   //title，章节的标题，必传
   //total，总字数，必传
   //time，时间，必传
   //content，内容，必传
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "data": {
           "chapterId": ""  //返回新添加的章节的id
       },
       "status": "0",
   }
   ~~~

### 18.删除章节（一章）

1. API：DELETE/chapter：id

2. 成功时返回的数据：

   ~~~json
   {
       "status": 0
   }
   ~~~

### 19.批量删除章节

1. API：POST/chapter/delete

2. 传递的参数：

   ~~~json
   {
       "chapterId": [
           id1, id2, id3, ..., idn
       ]
   }
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": 0
   }
   ~~~

### 20.获取用户(批量)

1. API：GET/users

2. 传递的参数：

   ~~~json
   {
       pageNum: 1,   // 当前页码  
       pageSize: 20, // 每页条数 
   }
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       users: [
           {
               "userId": "",
               "password": "",
               "name": "",
               "token": ""
           }
       ]
   }
   //userId，用户id
   //password，用户密码
   //name：用户名字
   //token，token码
   ~~~

### 21.获取用户信息（一个）

1. API：GET/users：id

2. 成功时返回的数据：

   ~~~json
   {
       "userId": "",
       "password": "",
       "name": "",
       "token": ""
   }
   ~~~

### 22.修改用户信息

1. API：PUT/users

2. 传递的参数：

   ~~~json
   {
       user: [
           {
               "id": "",
               "password": "",
               "name": "",
           }
       ]
   }
   //id，用户的id，必传，不可修改
   //password，用户密码，必传
   //name，用户名字，必传
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": 0
   }
   ~~~

### 23.添加用户

1. API：POST/users

2. 传递的参数：

   ~~~json
   {
       "userId": "",
       password: "",
       name: "",
       token: ""
   }
   //userId，用户id，必传
   //password，用户密码，必传
   //name：用户名字，必传
   //token，token码，必传
   ~~~

### 24.删除用户(一个)

1. API：DELETE/users：id

2. 返回的数据：

   ~~~json
   {
       "status": 0
   }
   ~~~

### 25.批量删除用户

1. API：POST/users/delete

2. 传递的参数

   ~~~json
   {
       users: [
           "id1","id2","id3",...,"idn"
       ]
   }
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": 0
   }
   ~~~

### 25.获取某章内容

1. API：GET/chapter/content：id

2. 成功时返回的数据：

   ~~~json
    [
           {
               "id": "",
               "bookId": "",
               "title": "",
               "total": "",
               "time": "",
               "content": ""
           }
       ] 
   //id，章节的id，必传，不可修改
   //bookId，书本的id，必传，不可修改
   //title，章节的标题，必传，可修改
   //total，章节的字数，必传，不可修改，自动计算的
   //time，时间
   //content，内容
   ~~~

### 26.登录

1. API：POST/login

2. 传递的参数：

   ~~~json
   {
       "userId":"",
       "password": ""
   }
   ~~~

3. 成功时返回的数据；

   ~~~json
   {
       "status": 0,
       "data": {
           "token": ""
           userId: ""
           name: "用户名"
          
       }
   }
   //token，token码
   ~~~

### 27.注册

1. API：POST/register

2. 传递的参数：

   ~~~json
   {
       "userId": "",
       "password": "",
       "name": ""
   }
   //userId，用户账号
   //password，用户密码
   //nanme，用户名
   ~~~

### 28.更换头像

1. API：PUT/users/picture

2. 传递的参数：

   ~~~json
   上传图片
   ~~~

3. 返回的数据：

   ~~~json
   {
       "src": ""
   }
   //src，头像临时链接
   ~~~

### 29.评分

1. API：PUT/books/score

2. 传递的参数：

   ~~~json
   {
       "id": "",
       "score": ""
   }
   //id，书的id
   //score，本次的评分
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": "0",
   }
   ~~~

### 30.阅读

1. API：PUT/books/read

2. 传递的参数：bookId

3. 成功时返回的数据：

   ~~~json
   {
       "status": "0"
   }
   ~~~

### 31.搜索

1. API：GET/book/search

2. 传递的参数：searchStr,pageNum,pageSize

3. 成功时返回的数据：

   ~~~json
   {
       "data": [],
       "status": "0",
       "code": "200",
       total:
   }
   //data的数据形式
   data: [
       {
           "id": "书的id",
           "categoryId": "分类id",
           "categoryName": "分类名",
           name: "书名",
           author: "作者名字",
           total: "总字数",
           status: "状态",
           score: "评分",
           bookDesc: "本书描述",
           readNum: "阅读次数",
           searchNum: "搜索次数",
           imgSrc: "图片路径"
       }
   ]
   ~~~

### 32.加入书架

1. API：POST/bookshelf

2. 传递的参数：

   ~~~josn
   {
   	"userId": "",
   	"bookId": "",
   	"chapterId": ""
   	"time": ""
   }
   //userId，用户的id
   //bookId，书的id
   //time，加入时间
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": "0"
   }
   ~~~

### 33.获取书架

1. API：GET/bookshelf：pageNum/：pageSize

2. 传递的参数：

   ~~~json
   {
       userId: "",
       pageNum: "",
       pageSize: ""
   }
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "data": [],
       "status": "0",
       "code": "200"
   }
   //data的数据形式
   data: [
       {
           "id": "书的id",
           "categoryId": "分类id",
           "categoryName": "分类名",
           name: "书名",
           author: "作者",
           total: "总字数",
           status: "状态",
           score: "评分",
           bookDesc: "本书描述",
           readNum: "阅读次数",
           chapterId: "章节id",
           searchNum: "搜索次数",
           imgSrc: "图片路径"
       }
   ]
   ~~~

### 34.删除书架书籍

1. API：DELETE/bookshelf:id

2. 传递的参数：

   ~~~json
   //id，收藏的id
   ~~~

3. 成功时返回的数据：

   ~~~json
   {
       "status": "0"
   }
   ~~~

   



