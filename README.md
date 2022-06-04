# Ask Commerce - (May 2022)
A full stack MERN e-commerce site that allows users to search by voice using IBM Watson.

- Live demo [_here_](www.askcommerce.co)

## General Information

AI is becoming more prevalent within our day to day lives. I'm fascinated by the technology and the possibilties it enables for us - both today and in the future. 

With that in mind, I wanted to start leveraging AI across different projects. In this project, modeled on an e-comm site, users can search for whatever they like using their microphone and it'll be pulled from Amazon's API. You can even flow through the checkout process (w/ Stripe) to confirm your order.

I built this in around two weeks as part of Ironhack's part-time Web Development Bootcamp as my third project, and is my first React app.

## Cool Features
- **Speech-To-Text:** Search for products using just your voice! The captured audio is processed by IBM's Watson AI.
- **Caching:** the performance of the Amazon-searching API I used is *terrible*. To counteract this, I cache the search results based on the search term for a week using Redis. 
- **Stripe:** complete checkout like a real e-comm site using Stripe. 

## Technologies Used
- React
- Redis (caching) 
- IBM Watson (speech-to-text API)
- Stripe 
- Node
- Express
- Mongo
- Mongoose
- Axios
- bcrypt
- Chakra UI
- Vercel (deployment)

## Usage
You can run this app after cloning by using `npm start`

## Project Status
Project is: _complete_

## Room for Improvement

- **Performance Optimization**: As noted above, some elements of the app run slow - I'd look to optimize the performance with caching likely common search terms or top products.
- **Testing**: This project didn't follow TTD principles, so if I was to expand the app I'd follow TTD using Jest for the new features.
- **SEO Optimization**: I could do more in terms of adding alt tags, meta descriptions etc

## Contact
Feel free to [_contact_](mailto:chrisjcastle93@gmail.com) me
