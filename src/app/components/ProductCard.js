"use client"
import { useRouter } from 'next/navigation';
import Addtocartbtn from './Addtocartbtn';
import Image from 'next/image';
const ProductCard = ({data}) => {
  const router = useRouter();
 
  return (
    <>    
    <div className="max-w-xs mx-auto py-1 gap-4 rounded-lg overflow-hidden border bg-white border-purple-200">
      <Image
      //   onError={(e) => {
      //   e.target.onerror = null; // Prevents infinite loop in case the fallback image also fails
      //   e.target.src = '/icon.png'; // Fallback image
      // }}
      height={100} width={100}
      onClick={()=>router.push('/'+'baby-care/baby-food/'+`${data.Product_Slug}`.replaceAll(' ','-'))}
       className="cursor-pointer w-full h-32 object-contain" src={data.ProductImage || '/icon.png'} alt={data.ProductName} />
      <div className="p-2">
        <p className='p-1 mb-2 bg-slate-100 rounded-md. w-16 text-[0.5em] font-semibold text-center'> 30 MINS</p>
        <div className='min-h-12'>
        <h3 className="text-[0.8em] font-semibold mb-2 text-ellipsis line-clamp-2 overflow-hidden">{data.ProductName}</h3>
       </div>
       <p className='text-gray-600 font-light mb-5 text-[0.8em]'>500 gm</p>
        <div className="flex items-center justify-between my-2">
          <div className="flex flex-col self-center">
          <span className="text-gray-800 leading-[0.2em] text-[0.8em] font-medium me-1">₹{data.ProductMrp?data.ProductMrp:data.ProductPrice}</span>
          {data.ProductMrp&&<span><strike className="text-gray-500 leading-[0.2em] text-[0.8em] font-light">₹{data.ProductPrice}</strike></span>}
          </div>
          <Addtocartbtn data={data}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
