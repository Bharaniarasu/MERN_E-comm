class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let keyword = this.queryStr.keyword
      ? {
          //filterquery mongodb
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }
  filter() {
    // queryStr = { keyword: 'del', catagory: 'laptops' }
    const queryStrCp = { ...this.queryStr };
    // console.log(queryStrCp);
    const omitFields = ["keyword", "page"];
    omitFields.forEach((field) => delete queryStrCp[field]);
    // /api/v1/products?keyword=&category=Accessories&price[gt]=100&price[lt]=500
    // console.log(queryStrCp);
    // { category: 'Accessories', price: { gt: '100', lt: '500' } } ,
    // we need to add $ symbol before keys to use with mongoose fiter so we acheive that with JSON methods
    let queryStr = JSON.stringify(queryStrCp);
    // console.log(queryStr);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, (match) => `$${match}`);
    //before parse {"category":"Accessories","price":{"$gt":"100","$lt":"500"}}
    queryStr = JSON.parse(queryStr);
    //after parse { category: 'Accessories', price: { '$gt': '100', '$lt': '500' } }
    // console.log(queryStr);

    // we can remove the other query fields or we can use only catagory field like below
    // this.query.find({ category: queryStrCp.category });
    //this.query.find({ category: queryStrCp }); or we can remove other fields and use it

    this.query.find(queryStr);
    return this;
  }
  paginate(productPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skipProductsBefore = productPerPage * (currentPage - 1);
    // console.log(currentPage, skipProductsBefore); //3 6
    // console.log(this.queryStr);
    const result = this.query.limit(productPerPage).skip(skipProductsBefore);
    // console.log(result);
    return this;
  }
}
module.exports = ApiFeatures;
