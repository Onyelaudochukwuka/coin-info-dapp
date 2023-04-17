/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import CloseIcon from "@icons/CloseIcon.icon";
import GithubIcon from "@icons/GithubIcon.icon";
import LinkedInIcon from "@icons/LinkedInIcon.icon";
import Loading from "@icons/Loading.icon";
import TwitterIcon from "@icons/TwitterIcon.icon";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

interface IData {
  totalSupply?: number,
  symbol?: string,
  name?: string
}
const Home: NextPage = () => {
  const [coinAddress, setCoinAddress] = useState("");
  const [coinInfo, setCoinInfo] = useState<IData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>("");
  const [open, setOpen] = useState(false);
  const intl = new Intl.NumberFormat("en-US" , { notation: 'compact' });

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/${coinAddress}`
      );
      const data: IData = await res.json();
      setCoinInfo(data);
      setOpen(true);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    
    }
  };
  return (
    <>
      <Head>
        <title>Coin Info Dapp</title>
        <meta name="author" content="Onyela Udochukwuka" />
        <meta
          name="description"
          content="A decentralized application that gives info on a coin from it's address"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          property="og:description"
          content="A decentralized application that gives info on a coin from it's address"
        />
        <meta
          property="og:image"
          content="https://coin-info-dapp.vercel.app/_next/image?url=%2Frainbow.ico&w=3840&q=75"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://coin-info-dapp.vercel.app"
        />
        <meta
          property="twitter:url"
          content="https://coin-info-dapp.vercel.app"
        />
        <meta name="twitter:title" content="Coin Info Dapp" />
        <meta
          name="twitter:description"
          content="A decentralized application that gives info on a coin from it's address"
        />
        <meta
          name="twitter:image"
          content="https://coin-info-dapp.vercel.app/_next/image?url=%2Ffavicon.png&w=1080&q=75"
        />

        <meta property="og:title" content="Coin Info Dapp" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#300048" />
        <meta name="description" content="Coin Info Dapp" />
        <link
          rel="icon"
          href="https://coin-info-dapp.vercel.app/_next/image?url=%2Ffavicon.png&w=1080&q=75"
        />
      </Head>
      <main className="bg-[#FCF8FE] h-screen overflow-y-hidden w-full flex flex-col items-center justify-between relative">
        <div className="flex flex-col items-center justify-center h-4/5 basis-4/5 gap-24 lg:w-auto w-10/12">
          {error ?
            (<p className="text-red-800 text-xl font-black">An Error Occurred Please Refresh the app</p>)
          :  loading ? (
            <Loading className="lg:w-36 w-24 lg:h-36 h-24" />
          ) : (
            <>
              <h2 className="lg:text-6xl text-4xl text-[#300048] font-bold">
                Coin Info Dapp
              </h2>
              <div className="flex flex-col gap-8 w-full">
                <input
                  className="border-2 border-[#300048] rounded-md px-4 py-3 w-full"
                  placeholder="Enter Coin Address"
                  value={coinAddress}
                  onChange={(e) => setCoinAddress(e.target.value)}
                />
                <button
                  className="bg-[#300048] text-white rounded-md px-4 py-3 w-full"
                  onClick={() => void getData()}
                >
                  Get Info
                </button>
              </div>
            </>
          )}
        </div>
        <div className="z-50 flex flex-col lg:gap-4 gap-1 items-center mb-2">
          <h4
            className={`lg:text-2xl text-xl  lg:font-bold font-medium transition-colors duration-300 ease-in ${
              open ? "text-white" : "text-black"
            }`}
          >
            Built By Udoka
          </h4>
          <span className="flex flex-row gap-8 items-center">
            <Link href="https://github.com/Onyelaudochukwuka">
              <GithubIcon
                className="w-9 h-auto transition-colors duration-300 ease-in"
                open={open}
              />
            </Link>
            <Link href="https://www.linkedin.com/in/udochukwukaonyela/">
              <LinkedInIcon
                className="w-10 h-auto transition-colors duration-300 ease-in"
                open={open}
              />
            </Link>
            <Link href="https://twitter.com/FUMUDUKUS">
              <TwitterIcon
                className="w-10 h-auto transition-colors duration-300 ease-in"
                open={open}
              />
            </Link>
          </span>
        </div>
        <div
          className={`absolute z-20 w-full h-[95%] bottom-0 bg-[#300048] rounded-t-[30px] text-white transition-translate ease-in duration-300 ${
            open ? "translate-y-0" : "translate-y-[130%]"
          }`}
        >
          <span
            className="absolute lg:top-8 lg:right-8 top-4 right-4 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <CloseIcon className="w-8 h-8" />
          </span>
          <div className="flex flex-col items-center mt-14 lg:mt-0 lg:justify-center h-full gap-8">
            <div className="flex items-center px-6 py-2 rounded-full border-2 border-white">
              <span
                className="w-36"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {coinAddress}
              </span>
            </div>
            <h2 className="text-4xl font-bold">Coin Info</h2>
            <div className="flex lg:flex-row flex-col w-9/12 mx-auto px-6 py-5 justify-between gap-5 font-bold border-2 border-white">
              <div className="flex flex-col gap-2 w-full items-center">
                <span>Name</span>
                <span className="text-4xl font-bold">{coinInfo?.name}</span>
              </div>
              <div className="lg:h-3/4 lg:w-[2px] w-full h-[3px] mx-auto lg:mx-0  bg-white lg:my-auto" />
              <div className="flex flex-col gap-2 w-full items-center">
                <span>Symbol</span>
                <span className="text-4xl font-bold">{coinInfo?.symbol}</span>
              </div>
              <div className="lg:h-3/4 lg:w-[2px] w-full h-[3px] mx-auto lg:mx-0  bg-white lg:my-auto" />
              <div className="flex flex-col gap-2 w-full items-center">
                <span>Total Supply</span>
                <span className="text-4xl font-bold">
                  {intl.format(coinInfo?.totalSupply || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
