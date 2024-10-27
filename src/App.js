
// import './App.css';
//   import React, { useState } from 'react';
// function App() {
//   const [images, setImages] = useState(Array(30).fill('./in_progress.png'));

//   const handleClick = (index) => {
//     const newImages = [...images];
//     newImages[index] = './done.png';
//     setImages(newImages);
//   };

//   return (
// <div>
//       <div>
//         <h1 className='first_side'><span>25/10/2024</span> <span> <img src="./right_arrow.png" alt="" /></span><span>23/01/2025</span></h1>
//       </div>
  
//       <div className='last_side'>
//       {images.map((src, index) => (
//         <div key={index} onClick={() => handleClick(index)} style={{ cursor: 'pointer' }} className='card'>
//           <img src={src} alt={`box-${index}`} style={{ width: '100px', height: '100px' }} />
//         </div>
//       ))}
//       </div>
// </div>

//   );
// }

// export default App;


import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const generateDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dates.push(currentDate.toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dates = generateDates('2024-10-25', '2025-01-23');
  
  // استخدام localStorage لتخزين حالة الصور
  const [images, setImages] = useState(() => {
    const savedImages = localStorage.getItem('images');
    return savedImages ? JSON.parse(savedImages) : Array(dates.length).fill('./in_progress.png');
  });

  const handleClick = (index) => {
    const newImages = [...images];
    newImages[index] = './done.png';
    setImages(newImages);
    localStorage.setItem('images', JSON.stringify(newImages)); // تحديث localStorage
  };

  // تحديث localStorage عند تغيير حالة الصور
  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  return (
    <div>
      <div>
        <h1 className='first_side'>
          <span>10/25/2024</span>
          <span><img src="./right_arrow.png" alt="" /></span>
          <span>01/23/2025</span>
        </h1>
      </div>
  
      <div className='last_side'>
        {dates.map((date, index) => (
          <div key={index} onClick={() => handleClick(index)} className='card'>
            <img src={images[index]} alt={`box-${index}`} style={{ width: '100px', height: '100px' }} />
            <div>{date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
