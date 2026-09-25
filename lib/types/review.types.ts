export interface IReview {
  id: string;
  rating: number;
  comment: string;
  propertyId: string;
  userId: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
}

export interface ICreateReviewPayload {
  propertyId: string;
  rating: number;
  comment: string;
}

export interface IReviewResponse {
  success: boolean;
  message?: string;
  data: IReview | IReview[];
}

export interface IReviewModalProps {
  propertyId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface PropertyReviewsProps {
  reviews?: IReview[];
}


export interface IPropertyWithReviews {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  category: {
    name: string;
  };
  landlord: {
    name: string;
    email: string;
  };
  reviews?: IReview[];
}