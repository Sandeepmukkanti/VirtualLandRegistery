import React, { useState } from 'react';

export default function SellLand() {
  const [landId, setLandId] = useState('');
  const [price, setPrice] = useState('');

  const handleSell = (e) => {
    e.preventDefault();
    alert(`Land ID ${landId} listed for sale at ${price} ICP`);
  };

  return (
    <div className="page">
      <h2>Sell Your Land</h2>
      <form onSubmit={handleSell}>
        <input type="text" placeholder="Land ID" onChange={e => setLandId(e.target.value)} /><br />
        <input type="text" placeholder="Asking Price in ICP" onChange={e => setPrice(e.target.value)} /><br />
        <button type="submit">List for Sale</button>
      </form>
    </div>
  );
}
