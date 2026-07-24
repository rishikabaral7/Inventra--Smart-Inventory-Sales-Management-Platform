const LowStockTable = ({
  products,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-5">

      <h2 className="text-xl font-bold mb-4">
        Low Stock Products
      </h2>

      <table className="w-full border">

        <thead>

          <tr>

            <th className="border p-2">
              Product
            </th>

            <th className="border p-2">
              Stock
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td className="border p-2">
                {product.name}
              </td>

              <td className="border p-2">
                {product.quantity}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default LowStockTable;