class CustomerDaos {
  constructor({ customerModel }) {
    this.customerModel = customerModel;
  }

  async getAll(config = {}) {
    try {
      const { limit, page } = config;
      const skipRows = limit * (page - 1);
      let customers;
      if (!isNaN(limit) && !isNaN(page)) {
        customers = await this.customerModel
          .find({})
          .limit(limit)
          .skip(skipRows);
      } else {
        customers = await this.customerModel.find({});
      }
      const total = await this.customerModel.estimatedDocumentCount();
      return { customers, total };
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" }
    }
  }

  async getById(id) {
    try {
      const customer = await this.customerModel.findById(id);
      return customer;
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" };
    }
  }

  async updateById(id, email, name, password, phone, payment_number, ci) {
    try {
      const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, {
        email: email,
        name: name,
        password: password,
        phone: phone,
        payment_number: payment_number,
        ci: ci
      }, { new: true });
      return updatedCustomer;
    } catch (err) {
      return { failure: true, message: err.message || "Something went wrong" }
    }
  }
}

module.exports = CustomerDaos;