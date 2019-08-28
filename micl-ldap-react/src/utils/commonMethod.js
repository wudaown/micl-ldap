export const handleInputChange = e => {
  const { name, value } = e.target;
  this.setState({ [name]: value });
};
