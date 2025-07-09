export interface CreateBookDto {
  title: string;
  author: string;
  description: string;
  copies:number;
  price: number;
  rating?: number;
  publisher?: string;
  year?: number;
  category: string;
  pages?: number;
  isbn?: string;
  format: string[];
  imageUrl: string;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}