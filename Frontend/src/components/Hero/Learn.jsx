import React, { useState } from 'react';
import learn from "../../assets/learn.png";

const Learn = () => {
  const [selected, setSelected] = useState('bid'); // "bid" or "sale"

  const handleSelect = (type) => {
    setSelected(type);
  };

  return (
    <div className="p-8 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary text-center">2 Steps To Learn</h2>
          <p className="text-lg text-base-content mt-4">
            Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer eget ex hendrerit
            mattis mauris. Vestibulum ante ipsum primis in faucibus orci luctus et.
          </p>
        </div>

        {/* Large Buttons */}
        <div className="flex justify-center mb-24">
          <button
            onClick={() => handleSelect('bid')}
            className={`py-4 px-8 text-xl  w-1/2 transition duration-300 ${selected === 'bid' ? 'bg-primary text-primary-content' : 'bg-gray-300'}`}
          >
            How To Bid
          </button>
          <button
            onClick={() => handleSelect('sale')}
            className={`py-4 px-8 text-xl  w-1/2 transition duration-300 ${selected === 'sale' ? 'bg-primary text-primary-content' : 'bg-gray-300'}`}
          >
            How To Sale
          </button>
        </div>

        {/* Content for each selection */}
        {selected === 'bid' && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left side: Image */}
            <div className="flex justify-center">
              <img
                src={learn} // Replace with actual image URL
                alt="How To Bid"
              />
            </div>

            {/* Right side: Instructions */}
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-accent"><span className="text-info">Step 01 :</span> Register your interest.</h4>
              <p className="text-base-content mb-8">
                Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer genb mattis mauris. 
                Vestibulum ante ipsum primis in faucibus orci luctus et. 
                Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer ante.
              </p>

              <h4 className="text-2xl font-semibold mb-4 text-accent"><span className="text-info">Step 02 :</span> Understand the payment terms.</h4>
              <p className="text-base-content mb-8">
                Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer genb mattis mauris. 
                Vestibulum ante ipsum primis in faucibus orci luctus et. 
                Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer ante.
              </p>

              <h4 className="text-2xl font-semibold mb-4 text-accent"><span className="text-info">Step 03 :</span> Present your bid.</h4>
              <p className="text-base-content">
                Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer genb mattis mauris.
                 Vestibulum ante ipsum primis in faucibus orci luctus et. 
                 Integer ante tellus, bibendum eget ante ut, aliquet luctus quam. Integer ante.
              </p>
            </div>
          </div>
        )}

        {selected === 'sale' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Image */}
            <div className="flex justify-center">
              <img
                src={learn} // Replace with actual image URL
                alt="How To Sale"
              />
            </div>

            {/* Right side: Instructions */}
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-accent"><span className="text-info">Step 01 :</span> Register your interest.</h4>
              <p className="text-base-content mb-8">
                Right-side Content Flexing: To prevent the right-side content from affecting the image size, 
                the content container now uses flex-1, which allows it to take up the remaining space without 
                influencing the image's dimensions.
              </p>

              <h4 className="text-2xl font-semibold mb-4 text-accent"><span className="text-info">Step 02 :</span> Understand the payment terms.</h4>
              <p className="text-base-content mb-8">
                Right-side Content Flexing: To prevent the right-side content from affecting the image size, 
                the content container now uses flex-1, which allows it to take up the remaining space without 
                influencing the image's dimensions.
              </p>

              <h4 className="text-2xl font-semibold mb-4 text-accent"><span className="text-info">Step 03 :</span> Present your bid.</h4>
              <p className="text-base-content">
                Right-side Content Flexing: To prevent the right-side content from affecting the image size, 
                the content container now uses flex-1, which allows it to take up the remaining space without 
                influencing the image's dimensions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
