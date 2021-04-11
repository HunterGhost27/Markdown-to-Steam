[h1][b]Stats Configurator[/b][/h1]

[h2]Divinity Original Sin 2: Definitive Edition[/h2]

<hr>

The [b][i]Stats Configurator[/i][/b] allows you to modify and customize stats by creating [i]config files[/i]. Through the configuration file, you can change attributes like [i]action-points costs, cooldowns[/i] and [i]memory costs[/i] of [b]skills[/b]; [i]gold-value, damage-values[/i] and [i]damage type[/i] of [b]weapons[/b]; [i]resistances[/i] and [i]item-color[/i] of [b]armors[/b]; [i]talents, accuracy[/i] and [i]dodge[/i] of [b]characters[/b]; and many more.

[h2]Releases[/h2]

- ~~**_[Steam Workshop](#SteamWorkshop)_**~~
- **_[Github](https://github.com/Shresht7/Stats-Configurator/releases)_**

[h2]Requirements[/h2]

- **_[Norbyte's Script-Extender](https://github.com/Norbyte/ositools)_**

[h2]Features[/h2]

[h3]Configure to your heart's desire[/h3]

Users can override stats by creating [b]json files[/b] (Default: [code]Config.json[/code]) like so:

[noparse][code]{
  "Projectile_Fireball": {
    "ActionPoints": 4,
    "Cooldown": 7,
    "ExplodeRadius": 10,
    "DisplayName": "BOOMER"
  }
}
[/code][/noparse]

<blockquote>
All config-files are created in the Osiris Data\StatsConfigurator\ folder. - i.e. [code]..\Documents\Larian Studios\Divinity Original Sin 2 Definitive Edition\Osiris Data\StatsConfigurator\[/code].
</blockquote>

When this configuration loads, it will override [code]Projectile_Fireball[/code]. The [b]Fireball[/b] skill will now cost [b][i]4 ActionPoints[/i][/b], have a [b][i]7 turn Cooldown[/i][/b], [i]explode[/i] in a [b][i]10m radius[/i][/b] and will be called [b][i]BOOMER[/i][/b].

[img]https://imgur.com/Vc3NkF8.png[/img]

[b][i]Checkout more [url=about:///Documentation/Examples.md]examples![/url][/i][/b]

[h3]Quick Start[/h3]

1. Create/Edit `Config.json` in `Osiris Data\StatsConfigurator\`.
2. `Load Configuration` from the in-game **mod-menu**.
3. `Rebuild ConfigData` once you're happy with your edits.
4. `Broadcast` your **ConfigData** to any peers. (Multiplayer)
5. `Verify` client configs to ensure everyone is on the same page.
6. **Done** - your **ConfigData** will automatically reload your edits whenever the game loads. Repeat the aforementioned options as necessary.
7. Restart the game for changes to apply.

============================

[b][i][url=about:///Documentation/Extensive-Documentation.md]READ THE EXTENSIVE DOCUMENTATION[/url][/i][/b]

============================

[h2]Complementary Mods[/h2]

- [**EXIM**](https://steamcommunity.com/sharedfiles/filedetails/?id=2006677782) by **_Luxen_** - EXIM allows you to export/import and modify characters stats, skills, inventory and hotbar.
- [**UI Components Library**](https://steamcommunity.com/sharedfiles/filedetails/?id=2337228868) - Enables the ContextMenu option to _apply configurations_.

<hr>

[h2]Thanks and Credits[/h2]

- **[Divinity: Original Sin 2](http://store.steampowered.com/app/435150/Divinity_Original_Sin_2/)**, a game by **[Larian Studios](http://larian.com/)**.
- **LaughingLeader** for the **[Source Control Generator](https://github.com/LaughingLeader/SourceControlGenerator)**.
- Huge thanks to **Norbyte** for the **[Script-Extender](https://github.com/Norbyte/ositools)**, for valuable advice and for having a fix for every problem.