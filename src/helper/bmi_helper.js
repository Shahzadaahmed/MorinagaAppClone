const getTotalCount = arr => {
  return arr?.reduce(
    (accumulator, item) => accumulator + parseInt(item?.calories * item?.count),
    0,
  );
};

const BmiHelper = {
  getTotalCount,
};

export default BmiHelper;
