const RecentSales = ({
  sales,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-5">

      <h2 className="text-xl font-bold mb-4">
        Recent Sales
      </h2>

      <table className="w-full border">

        <thead>

          <tr>

            <th className="border p-2">
              Invoice
            </th>

            <th className="border p-2">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {sales.map((sale) => (

            <tr key={sale.id}>

              <td className="border p-2">
                {sale.invoiceNumber}
              </td>

              <td className="border p-2">
                Rs. {sale.totalAmount}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentSales;