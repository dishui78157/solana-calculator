use anchor_lang::prelude::*;

declare_id!("64RvgDGkC42kFsW6vjyJQbcRCCcJviK9rfXqr3WQzw37");

#[program]
pub mod calculatordapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
