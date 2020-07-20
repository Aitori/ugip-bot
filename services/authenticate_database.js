const authenticateDatabase = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect: ', error);
  }
};

export default authenticateDatabase;