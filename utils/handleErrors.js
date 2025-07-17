//handle errors
export const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', username: '', password: ''};
    //incorrect username
    if (err.message === 'Incorrect Username'){
      errors.username = 'Username not registered'
    }

    //incorrect password
    if (err.message === 'Incorrect Password'){
      errors.password = 'Incorrect Password'
    }

    //duplicate error code 
    if (err.code === 11000){
      errors.email = 'Email has already been used';
      errors.username = 'Username has already been used';
      return errors;
    }
    //validation errors
    if (err.message.includes('User validation failed')){
      Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
      })
    }
    return errors;
  }
