const users = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByEmail: jest.fn(),
  emailExist: jest.fn(),
  findByPhone: jest.fn(),
  findIdByPhone: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
};

export default users;
