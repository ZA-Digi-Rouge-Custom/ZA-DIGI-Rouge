import { SpeciesFormKey } from "#enums/species-form-key";
import { SpeciesId } from "#enums/species-id";

/**
 * ZARouge-added mega forms without dedicated UI icons.
 * These use the species' normal (pre-mega) icon in menus and battle UI.
 * Vanilla megas with existing atlas frames (e.g. Garchomp mega, not mega-z) are excluded.
 */
const ZAR_MEGA_BASE_ICON_LOOKUP: Partial<Record<SpeciesId, Partial<Record<SpeciesFormKey, true>>>> = {
  [SpeciesId.ABSOL]: { [SpeciesFormKey.MEGA_Z]: true },
  [SpeciesId.BARBARACLE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.BAXCALIBUR]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.BLASTOISE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.CHANDELURE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.CHESNAUGHT]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.CHIMECHO]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.CLEFABLE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.CRABOMINABLE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.DARKRAI]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.DELPHOX]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.DRAGALGE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.DRAGONITE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.DRAMPA]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.EELEKTROSS]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.EMBOAR]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.ETERNAL_FLOETTE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.EXCADRILL]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.FALINKS]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.FERALIGATR]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.FROSLASS]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.GARCHOMP]: { [SpeciesFormKey.MEGA_Z]: true },
  [SpeciesId.GLIMMORA]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.GOLISOPOD]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.GOLURK]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.GRENINJA]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.HAWLUCHA]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.HEATRAN]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.LUCARIO]: { [SpeciesFormKey.MEGA_Z]: true },
  [SpeciesId.MAGEARNA]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.MALAMAR]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.MEGANIUM]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.MEOWSTIC]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.PYROAR]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.RAICHU]: { [SpeciesFormKey.MEGA_X]: true, [SpeciesFormKey.MEGA_Y]: true },
  [SpeciesId.SCOLIPEDE]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.SCOVILLAIN]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.SCRAFTY]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.SKARMORY]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.STARAPTOR]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.TATSUGIRI]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.VICTREEBEL]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.ZERAORA]: { [SpeciesFormKey.MEGA]: true },
  [SpeciesId.ZYGARDE]: { [SpeciesFormKey.MEGA]: true },
};

/** Whether this form should use the normal species UI icon (ZAR custom megas). */
export function shouldUseZarMegaBaseIcon(speciesId: SpeciesId, formSpriteKey: string | null): boolean {
  if (!formSpriteKey) {
    return false;
  }
  const species = ZAR_MEGA_BASE_ICON_LOOKUP[speciesId];
  if (!species) {
    return false;
  }
  return species[formSpriteKey as SpeciesFormKey] === true;
}
