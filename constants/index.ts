export interface DishProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any; // Puedes ajustar este tipo según sea necesario (por ejemplo, si usas una librería específica para las imágenes)
}

export interface RestaurantProps {
  id: number;
  name: string;
  image: any;
  description: string;
  lng: number;
  lat: number;
  address: string;
  stars: number;
  reviews: string;
  category: string;
  dishes: DishProps[];
}

export const categories = [
  {
    id: 1,
    name: 'Pizza',
    image: require('../assets/categories/pizza-96.png'),
  },
  {
    id: 2,
    name: 'Burger',
    image: require('../assets/categories/pizza-96.png'),
  },
  {
    id: 3,
    name: 'Chinnese',
    image: require('../assets/categories/pizza-96.png'),
  },
  {
    id: 4,
    name: 'Pizza',
    image: require('../assets/categories/pizza-96.png'),
  },
  {
    id: 5,
    name: 'Burger',
    image: require('../assets/categories/pizza-96.png'),
  },
  {
    id: 6,
    name: 'Chinnese',
    image: require('../assets/categories/pizza-96.png'),
  },
];

export const featured = {
  id: 1,
  title: 'Hot and Spicy',
  description: 'Soft and tender fried chicken',
  restaurants: [
    {
      id: 1,
      name: 'Papa Johns',
      image: require('../assets/restaurants/papajohns.jpg'),
      description: 'Hot and spicy pizzas',
      lng: 38.2145602,
      lat: -85.5324269,
      address: '434 second street',
      stars: 4,
      reviews: '4.4k',
      category: 'Fast Food',
      dishes: [
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
      ],
    },
    {
      id: 2,
      name: 'Dominoes',
      image: require('../assets/restaurants/papajohns.jpg'),
      description: 'Hot and spicy pizzas',
      lng: 38.2145602,
      lat: -85.5324269,
      address: '434 second street',
      stars: 4,
      reviews: '4.4k',
      category: 'Fast Food',
      dishes: [
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
      ],
    },
    {
      id: 3,
      name: 'Burger King',
      image: require('../assets/restaurants/papajohns.jpg'),
      description: 'Hot and spicy pizzas',
      lng: 38.2145602,
      lat: -85.5324269,
      address: '434 second street',
      stars: 4,
      reviews: '4.4k',
      category: 'Fast Food',
      dishes: [
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
        {
          id: 1,
          name: 'pizza',
          description: 'Cheezy garlic pizza',
          price: 10,
          image: require('../assets/restaurants/papajohns.jpg'),
        },
      ],
    },
  ],
};
