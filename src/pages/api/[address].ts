/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as ethers from 'ethers';
const uniswapRouterAddress = '0xb6F43025B29196Af2dddd69b0a58AFBa079cD600'; // Uniswap Router address
console.log();
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { address } = req.query as { address: string };
  const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/b62d78e9a512431a9ca4bb1afaa498e5'); // Use your own Infura project ID or Ethereum node URL
  switch (method) {
    case 'GET':
      try {
        const uniswapRouter = new ethers.Contract(address, [
          'function totalSupply() public constant returns(uint)',
          'function balanceOf(address who) public constant returns(uint)',
          'function symbol() external view returns (string memory)',
          'function name() external view returns (string memory)'
        ], provider);
        // ethers.formatUnits(await uniswapRouter?.totalSupply()), await uniswapRouter?.name(), await uniswapRouter?.symbol(), ethers.formatUnits((await uniswapRouter?.balanceOf('0x6b175474e89094c44da98b954eedeac495271d0f')))
        res.status(200).json({
          totalSupply: ethers.formatUnits(await (uniswapRouter?.totalSupply ?? function () { return 0; })()),
          symbol: await (uniswapRouter.symbol ?? function () { return ""; })(),
          name: await (uniswapRouter?.name ?? function () { return ""; })(),
        });
      } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
      }
      break

    default:
      res.status(500).json('Server error');
      break
  }
}
