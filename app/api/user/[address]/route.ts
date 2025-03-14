import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    await connectDB();
    console.log("connected\n\n");
    
    
    let user = await User.findOne({ address: params.address.toLowerCase() });
    
    if (!user) {
      // Create new user if not exists
      user = await User.create({
        address: params.address.toLowerCase(),
        nonce: Math.floor(Math.random() * 1000000).toString(),
        transactions: 0,
        lastActive: new Date()
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    
    const user = await User.findOneAndUpdate(
      { address: params.address.toLowerCase() },
      { 
        $set: { lastActive: new Date() },
        $inc: { transactions: 1 }
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    );
  }
}