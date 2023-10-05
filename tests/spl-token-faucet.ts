import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
const assert = require("assert");
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
	TOKEN_PROGRAM_ID,
	getAssociatedTokenAddress,
} from "@solana/spl-token"
import { SplTokenFaucet } from "../target/types/spl_token_faucet";

const payer = anchor.web3.Keypair.generate();
describe("spl-token-faucet", () => {
	anchor.setProvider(anchor.AnchorProvider.env());
	const program = anchor.workspace.SplTokenFaucet as Program<SplTokenFaucet>;

	async function getBalance(receiver, mintPda) {
		const parsedTokenAccountsByOwner =
			await program.provider.connection.getParsedTokenAccountsByOwner(
				receiver,
				{ mint: mintPda }
			);

		let balance =
			parsedTokenAccountsByOwner.value[0].account.data.parsed.info.tokenAmount
				.uiAmount;

		return balance;
	}
	it("Initializes the token", async () => {
    await program.methods.initializeMint().rpc()
  })

	it("Airdrop tokens  and check token account", async () => {
		const [mintPda, _] =
		await anchor.web3.PublicKey.findProgramAddressSync(
			[Buffer.from("faucet-mint")],
			program.programId
		);

		let associatedTokenAccount = await getAssociatedTokenAddress(
			mintPda,
			payer.publicKey
		);

		const signature = await program.provider.connection.requestAirdrop(payer.publicKey, LAMPORTS_PER_SOL * 2)
    let latestBlockhash = await program.provider.connection.getLatestBlockhash();
    await program.provider.connection.confirmTransaction(
      {
        signature,
        ...latestBlockhash,
      },
      "confirmed"
    );

		let amount = 1;
		let amountToAirdrop = new anchor.BN(amount * 1000000);
		await program.methods.airdrop(amountToAirdrop).accounts({
			mint: mintPda,
			tokenAccount: associatedTokenAccount,
			user: payer.publicKey,
		})
		.signers([payer])
		.rpc()




		let balance = await getBalance(payer.publicKey, mintPda);
		assert.ok(balance == amount);

	});
});
