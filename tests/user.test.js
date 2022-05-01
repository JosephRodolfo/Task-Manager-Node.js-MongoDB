const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userOne, userOneId, nonExistent, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

test("should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "J.R.",
      email: "testllll@yahoo.com",
      password: "computer12345",
    })
    .expect(201);

  //assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //assertion about the response

  expect(response.body).toMatchObject({
    user: {
      name: "J.R.",
      email: "testllll@yahoo.com",
    },
  });

  expect(user.password).not.toBe("computer12345");
});

test("should log in an existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)


    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test("should not log in non existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: nonExistent.email,
      password: nonExistent.password,
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/userMe")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauthenticated user", async () => {
  await request(app).get("/userMe").send().expect(401);
});


test("should delete account for user", async () => {
    await request(app)
    .delete(`/userMe`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)





    const user = await User.findById(userOneId)
    expect(user).toBeNull()
});

test("should not delete unathenticated user", async () => {
  await request(app).delete(`/userMe`).send().expect(401);
});


test('Should upload avatar image', async ()=>{
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('Should update valid users fields', async ()=>{
  await request(app)
    .patch('/userMe')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name:"Joe"
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe("Joe")
})

test('Should not update invalid users fields', async ()=>{
  await request(app)
    .patch('/userMe')
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location:"Chicago, Illinois"
    }).expect(400)

  
})

