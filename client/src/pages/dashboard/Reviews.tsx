import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StarIcon } from '@heroicons/react/24/solid';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
  barber: {
    firstName: string;
    lastName: string;
  };
}

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Carregar avaliações
  }, []);

  return (
    <div className="p-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Avaliações</h1>
          <p className="mt-2 text-sm text-gray-700">
            Avaliações dos clientes
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <ul role="list" className="divide-y divide-gray-100">
          {reviews.length === 0 ? (
            <li className="py-4 text-center text-gray-500">
              Nenhuma avaliação encontrada
            </li>
          ) : (
            reviews.map((review) => (
              <li key={review.id} className="py-6">
                <div className="flex items-center gap-x-4">
                  <div className="flex-auto">
                    <div className="flex items-start justify-between gap-x-3">
                      <div>
                        <div className="flex items-center gap-x-3">
                          <h3 className="text-sm font-semibold leading-6 text-gray-900">
                            {`${review.user.firstName} ${review.user.lastName}`}
                          </h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <StarIcon
                                key={index}
                                className={`h-4 w-4 ${
                                  index < review.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Barbeiro: {`${review.barber.firstName} ${review.barber.lastName}`}
                        </p>
                      </div>
                      <p className="text-xs leading-5 text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
} 