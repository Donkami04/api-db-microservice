
# Database as Microservice

This is an API REST that let you create users with JWT authentication. The main objective of this api is to establish the database as a microservice, thus allowing the option to change the database as it is located on an individual port.
The MySQL Database was used in this case.



## API Reference

#### Get all users

```http
  GET /api/user
```
Get all the users

#### Get one user

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Create one user

```http
  POST /api/users
```
Follow the below example for create one user.

```javascript
{
	"name": "juan",
	"username": "garveis",
	"password": "3434347",	

}
```

#### Validate login

```http
  PUT /auth/login
```
Here is Required the username and password

```javascript
{
	"username": "garveis",
	"password": "3434347",	
}
```

