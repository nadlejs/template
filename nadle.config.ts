import { tasks, ExecTask, PnpmTask, DeleteTask } from "nadle";

const baseEslintArgs = ["-r", "exec", "eslint", ".", "--quiet"];

tasks.register("clean", DeleteTask, { paths: ["**/lib/**", "**/build/**"] }).config({
	group: "Development",
	description: "Clean build artifacts"
});

tasks.register("spell", ExecTask, { command: "cspell", args: ["**", "--quiet", "--gitignore"] });
tasks.register("eslint", PnpmTask, { args: baseEslintArgs });
tasks.register("prettier", ExecTask, { command: "prettier", args: ["--check", "."] });
tasks.register("check").config({ dependsOn: ["spell", "eslint", "prettier"] });

tasks.register("build", PnpmTask, { args: ["-r", "build"] }).config({ dependsOn: ["buildNadle", "buildDoc", "buildOthers"] });

tasks.register("testUnit", PnpmTask, { args: ["run", "-r", "test"] }).config({ dependsOn: ["build"] });
tasks.register("test").config({ dependsOn: ["testUnit"] });

tasks.register("fixEslint", PnpmTask, { args: [...baseEslintArgs, "--fix"] });
tasks.register("fixPrettier", ExecTask, { command: "prettier", args: ["--write", "."] });
tasks.register("format").config({ dependsOn: ["fixEslint", "fixPrettier"] });
