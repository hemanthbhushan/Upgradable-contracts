const {expect} = require('chai');
const { ethers, upgrades } = require('hardhat');
const { isCallTrace } = require('hardhat/internal/hardhat-network/stack-traces/message-trace');




describe("testing upgradable contracts",()=>{
  let proxy,initial,upgrade,owner1,initialProxy,v3;
  beforeEach(async()=>{

    [owner1,signer1] = await ethers.getSigners();

    const Proxy  = await ethers.getContractFactory("OwnedUpgradeabilityProxy");
    const Initial = await ethers.getContractFactory("Initial");
    const UpgradeA = await ethers.getContractFactory("upgradeA");
    const Version3 = await ethers.getContractFactory("version3");
    proxy = await Proxy.deploy();
    // console.log("proxy address",proxy.address);
    initial = await Initial.deploy();
    // console.log("initial address",initial.address);
    initialProxy = initial.attach(proxy.address);
    // console.log("initialproxy address",initialProxy.address);
    upgrade = await UpgradeA.deploy();

    v3 = await Version3.deploy();
})
describe("testing the proxie",()=>{
  it("checking the implementation",async()=>{

    
    await proxy.upgradeTo(upgrade.address);

    
    
   await initialProxy.initialize(3);
    
    await initialProxy.increament();
    const num1 = await initialProxy.get();

    expect(num1).to.equal(10);

    //upgrading to new contract called initial

    await proxy.upgradeTo(initial.address);

    const balance1 = await initialProxy.get();

    //here balance is equalto 10 beacuse initially we assigned the num to 10 using the old contract

    expect(balance1).to.equal(10);

    await initialProxy.increament();

     const balance2 = await initialProxy.get();

    //here we have used the upgraded proxy where in the upgraded proxy the increament function increaments by 10 times 

    expect(balance2).to.equal(20);

    // upgrading to version 3

    // await proxy.upgradeTo(v3.address);

    // // await initialProxy.enterName("hemanth");
    // // const name = await initialProxy.getName();
    // const balance3 = await initialProxy.get();


    // // expect(name).to.equal("hemanth");
    // expect(balance3).to.equal(20);

    // await initialProxy.initialize(1);

    // expect(await initialProxy.get()).to.equal(1);

 })
 it("check the upgradation",async()=>{
  await proxy.upgradeTo(v3.address);

  // await initialProxy.enterName("hemanth");
  // const namee = await initialProxy.getName();
  
  balance = await initialProxy.get();
  console.log("name is",balance);
 }) 
  it("if the other address calls the onlyadmin functions it gets rejected ",async()=>{
    expect(proxy.connect(signer1).upgradeTo(initial.address)).to.be.revertedWith("OwnedUpgradeabilityProxy: FORBIDDEN");
  })
})
 
})
 