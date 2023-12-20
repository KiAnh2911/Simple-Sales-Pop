import {getCurrentShop} from '../helpers/auth';
import {getSettingsRepoById, updateSettingsRepo} from '../repositories/settingsRepository';

/**
 * @param ctx
 *
 */

export async function getSettings(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const settings = await getSettingsRepoById(shopId);

    ctx.body = {data: settings};
  } catch (error) {
    console.log(error);
  }
}

export async function updateSettings(ctx) {
  try {
    const {data} = ctx.req.body;
    await updateSettingsRepo(data);
    ctx.body = {success: true};
  } catch (error) {
    console.log(error);
  }
}
