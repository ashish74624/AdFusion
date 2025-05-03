
# Ad Server Platform - AdFusion

A full-stack ad serving platform that implements core functionality similar to Google AdSense, allowing publishers to monetize their websites and advertisers to run ad campaigns.

## Features

- Complete ad serving system with publishers and advertisers  
- Campaign management and tracking  
- Ad placement and zone management  
- Real-time statistics and reporting  
- Multi-format ad support (JavaScript, iFrame, JSON)  
- Dark/light theme support  

## Tech Stack

### Frontend

- React 19  
- TypeScript  
- Vite  
- TailwindCSS  
- Chart.js  
- React Router  

### Backend

- Node.js  
- Express  
- MongoDB  
- Mongoose  

## Core Concepts

### Publishers

Website owners who want to monetize their content by displaying ads. They can:

- Create ad zones  
- Generate ad tags  
- View earnings and statistics  

### Advertisers

Companies/individuals who want to display ads. They can:

- Create ad campaigns  
- Upload ad creatives  
- Target specific zones  
- View campaign performance  

### Campaigns

Groups of ads that:

- Can be assigned to multiple zones  
- Track impressions and clicks  
- Support multiple ad formats  
- Have reporting capabilities  

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ashish74624/AdFusion.git
```

### 2. Install dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Configure MongoDB

- Create a MongoDB database  
- Update connection settings in `.env file` 

### 4. Start the servers

```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

## Development

### Backend API Structure

- `/advertiser` - Advertiser management  
- `/campaign` - Campaign management  
- `/publisher` - Publisher management  
- `/zone` - Zone management  
- `/adserve` - Ad serving endpoints  
- `/report` - Statistics and reporting  

### Frontend Structure

- `/src/pages` - Main application pages  
- `/src/components` - Reusable UI components  
- `/src/utils` - Helper utilities  
- `/src/assets` - Static assets  

## Contributing

1. Fork the repository  
2. Create a feature branch  
3. Commit changes  
4. Push to the branch  
5. Create a Pull Request  
