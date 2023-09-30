import * as anchor from '@project-serum/anchor';
import * as assert from 'assert';
const { SystemProgram } = anchor.web3;


import { Program } from "@coral-xyz/anchor";
import { Calculatordapp } from "../target/types/calculatordapp";

describe('calculatordapp', () => {
   // const provider = anchor.AnchorProvider.local();
    //anchor.setProvider(provider);
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
   // anchor.setProvider(anchor.AnchorProvider.env());
    const calculator = anchor.web3.Keypair.generate();
   // const program = anchor.workspace.Calculatordapp;
    const program = anchor.workspace.Calculatordapp;

    it('Create a calculator', async()=> {
        await program.methods.create("Calculator initialized")
        .accounts({
          calculator: calculator.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId
        })
        .signers([calculator])
        .rpc();
        
          const account = await program.account.calculator.fetch(calculator.publicKey);
          assert.ok(account.greeting === "Calculator initialized");
      });
      // the following is deprecated
    //it('create a calculator', async () => {
    //    await program.rpc.create({
    //        accounts: {
    //            calculator: calculator.publicKey,
    //            user: provider.wallet.publicKey,
    //            systemProgram: SystemProgram.programId,
    //        },
    //        signers: [calculator]
    //    },"Welcome to Solana");
//
    //    const account = await program.account.calculator.fetch(calculator.publicKey);
    //    assert.ok(account.greeting === "Welcome to Solana");
    //});
    it('Adds two numbers', async() => {
        //new methods as rpc is deprecated
        await program.methods.add(new anchor.BN(3), new anchor.BN(2))
        .accounts({calculator: calculator.publicKey})
        .rpc();
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(5)));
      });

      //the following is deprecated
    //it('Adds two numbers', async () => {
    //    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
    //        accounts: {
    //            calculator: calculator.publicKey,
    //        },
    //    });
    //    const account = await program.account.calculator.fetch(calculator.publicKey);
    //    assert.ok(account.result.eq(new anchor.BN(5)));
    //});

    it('Subtracts two numbers', async () => {
        await program.methods.subtract(
        new anchor.BN(2), new anchor.BN(3))
            .accounts( {
                calculator: calculator.publicKey,
            }).rpc();
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(-1)));
    });

    it('Multiplies two numbers', async () => {
        await program.methods.multiply(new anchor.BN(2), new anchor.BN(3))
            .accounts( {
                calculator: calculator.publicKey,
            }).rpc();
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(6)));
     });
    
     it('Divides two numbers', async () => {
        await program.methods.divide(new anchor.BN(2), new anchor.BN(3))
            .accounts({
                calculator: calculator.publicKey,
        }).rpc();
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(0)));
        assert.ok(account.remainder.eq(new anchor.BN(2)));
     });
});
