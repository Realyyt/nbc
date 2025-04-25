import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Course as CourseType } from '../contexts/CartContext';

interface CourseCardProps {
  course: CourseType;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const courseInCart = isInCart(course.id);

  // Toggle cart function
  const toggleCart = () => {
    if (courseInCart) {
      removeFromCart(course.id);
    } else {
      addToCart(course);
    }
  };

  return (
    <div className="card overflow-hidden group">
      {/* Course image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-accent text-foreground text-xs font-semibold px-2 py-1 rounded">
          {course.category}
        </div>
      </div>
      
      {/* Course details */}
      <div className="p-4">
        <Link to={`/courses/${course.id}`} className="block">
          <h3 className="font-medium text-lg line-clamp-2 hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={14} 
                className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(24 reviews)</span>
        </div>
        
        {/* Price and actions */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="font-semibold text-lg">₦{course.price.toLocaleString()}</span>
          </div>
          <button 
            onClick={toggleCart} 
            className={`p-2 rounded-full transition-colors ${
              courseInCart 
                ? 'bg-success/10 text-success hover:bg-success/20' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            {courseInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;