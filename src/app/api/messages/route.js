import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(messagesFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newMessage = await request.json();
    const fileContents = fs.readFileSync(messagesFilePath, 'utf8');
    const messages = JSON.parse(fileContents);
    
    newMessage.id = Date.now().toString();
    newMessage.date = new Date().toISOString();
    
    // Add new message to the beginning
    messages.unshift(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
