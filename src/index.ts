import { Command, flags } from "@oclif/command";
const { prompt } = require("enquirer");
const chalk = require("chalk");
const signBunny = require("sign-bunny");

class Mycli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(Mycli);

    if (typeof flags.name === "undefined") {
      flags.name = await prompt({
        type: "input",
        name: "name",
        message: `What is your ${chalk.bold.green("name")}?`,
      })
        .then(({ name }: { name: string }) => name)
        .catch(console.error);
    }

    const name = flags.name || "world";

    // max word limit for sign-bunny: 10 chars
    const asciiArt = signBunny(`hello ${name}`);
    this.log(asciiArt);

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}

export = Mycli;
