[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13043062&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# My Assets App Server
My News Portal App is an application to give your information about news from world. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /users/login


_Request Body_
```
{
    email : "string",
    password : "string"
}
```

_Response (200 - OK)_
```
[
  {
    access_token : "<your_access_token>"
  }
]
```
_Response (400 - Bad Request)_
```
{
  "message": "email and password is required"
}
```
_Response (401 - Unauthorize)_
```
{
  "message": "email/password is wrong"
}
```
_Response (500 - Internet Server Error)_
```
{
  "message": "Internet Server Error"
}
```
---
#### POST /users/add-user


_Request Body_
```
    {
      "userName": "string",
      "email": "string",
      "password": "string",
      "role": "string",
      "phoneNumber": "string",
      "address": "string"
    }
```
_Request Header_
```
    {
        access_token : <token>
    }
```

_Response (200 - OK)_
```
[
  {
    message : "string"
  }
]
```
_Response (400 - Bad Request)_
```
{
  "message": "email and password is required"
}
```
_Response (401 - Unauthorize)_
```
{
  "message": "email/password is wrong"
}
```
_Response (404 - Not Found)_
```
{
  "message": "email/password is wrong"
}
```
_Response (500 - Internet Server Error)_
```
{
  "message": "Internet Server Error"
}
```
---
#### POST lodgings


_Request Body_
```
    {
      "name": "Suite"
    }
```

_Request Header
```
    {
      "access_token": "<token>"
    }
```
_Response (200 - OK)_
```
[
  {
    message : "string"
  }
]
```
_Response (400 - Bad Request)_
```
{
  "message": "email and password is required"
}
```
_Response (401 - Unauthorize)_
```
{
  "message": "email/password is wrong"
}
```
_Response (404 - Not Found)_
```
{
  "message": "email/password is wrong"
}
```
_Response (500 - Internet Server Error)_
```
{
  "message": "Internet Server Error"
}
```
---