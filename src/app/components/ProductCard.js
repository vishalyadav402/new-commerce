"use client"
import { useRouter } from 'next/navigation';
import Addtocartbtn from './Addtocartbtn';
import Image from 'next/image';
const ProductCard = ({data}) => {
  const router = useRouter();
  return (
    <>    
    
    <div className="relative max-w-xs mx-auto py-1 gap-4 rounded-lg overflow-hidden border bg-white border-purple-200">
      
      {/* discount % */}
     {data.ProductMrp &&
      <div className='absolute top-0 right-3'>
      <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z" fill="#256fef"></path></svg>
      <div className='absolute top-0 left-0 text-white text-[11px] flex items-center justify-center h-[29px] w-[29px]'>
        <div>{data.ProductPrice && `${Math.round(((data.ProductMrp - data.ProductPrice) / data.ProductMrp) * 100)}%`}</div>
        </div>
      </div>
      }
      
      
      <Image
        onError={(e) => {
        e.target.onerror = null; // Prevents infinite loop in case the fallback image also fails
        e.target.src = '/images/placeholder-icon.png'; // Fallback image
      }}
      height={100} width={100}
      // onClick={()=>router.push("/cleaning-essentials/floor-and-surface-cleaners/colin-glass-cleaner")}
      onClick={()=>router.push("/"+data.categoryslug+"/"+data.subcategoryslug+"/"+data.Product_Slug)}
      className="cursor-pointer w-full h-32 object-contain" src={data.ProductImage || '/images/placeholder-icon.png'} alt={data.ProductName} />
      <div className="p-2">
        {/* <p className='p-1 mb-1 bg-beige-light rounded-md. w-16 text-[0.5em] font-semibold text-center'> 60-90 MINS</p> */}
        <div className='min-h-12'>
        <h3 className="text-[0.8em] font-semibold mb-1 text-ellipsis line-clamp-2 overflow-hidden">{data.ProductName}</h3>
       </div>
       <p className='text-gray-600 font-light text-[0.8em]'>Pack of 1</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center">
          <span className="text-gray-800 leading-none text-[0.8em] font-medium">₹{parseInt(data.ProductPrice)}</span>
          {data.ProductMrp&&<strike className="text-gray-500 leading-none text-[0.8em] font-light">₹{parseInt(data.ProductMrp?data.ProductMrp:data.ProductPrice)}</strike>}
          </div>
          <Addtocartbtn data={data}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
