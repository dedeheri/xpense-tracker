const numberFormatter = (amount: number) => {
  const format = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  return format.replace("Rp", "").trim();
};

export default numberFormatter;
