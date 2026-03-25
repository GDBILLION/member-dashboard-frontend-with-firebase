### Feature: Real-time Member Dashboard

## Overview
I have successfully built and integrated a Community Member Dashboard using React, TypeScript, and Firebase Firestore. This project demonstrates a full-stack flow with real-time data synchronization.
## Key "Bricks" Completed:
- Firebase Integration: Connected the app to a custom Firestore instance named members.
- Real-time Synchronization: Implemented onSnapshot listeners to allow the UI to update instantly when data changes in the cloud (no refresh needed).
- Dynamic UI: Built a tabbed navigation system (Members / Recent Activity) with a searchable data table.
- Type Safety: Used TypeScript interfaces to ensure data integrity for member objects (Godwin, Fabian, Michael).
- Configuration Architecture: Isolated Firebase logic into a dedicated firebase.config.ts using the Singleton pattern.
## Technical Skills Showcased:
- React Hooks (useState, useEffect, useMemo)
- NoSQL Database Design (Firestore)
- Component Composition & Reusability
