import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { broker_id, chain_id, user_address } = body;

    // Validate required fields
    if (!broker_id || !chain_id || !user_address) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Forward request to Orderly faucet API (testnet only - faucet doesn't exist on mainnet)
    const response = await fetch(
      'https://testnet-operator-evm.orderly.org/v1/faucet/usdc',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          broker_id,
          chain_id,
          user_address,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log('Faucet API error:', data);
      return NextResponse.json(
        { success: false, message: data.message || response.statusText },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Faucet API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
