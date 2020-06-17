---
uid: yo-fluid
---

# yo fluid

**yo fluid** is a tool that helps create a scaffold for a Fluid component called **diceroller**.

<style>
  iframe#diceroller {
    height: 95px;
    width: 200px;
  }
</style>

<iframe id="diceroller" src="/fluid/diceroller.html"></iframe>


First, [clone the Fluid Framework repo locally](https://github.com/microsoft/FluidFramework).

Once you've cloned the repo, you can set up the `yo fluid` bootstrapper:

:::: tabs
::: tab Windows

```
npm install -g yo
cd .\FluidFramework\tools\generator-fluid
npm install
npm link
```

:::
::: tab macOS/Linux

```
npm install -g yo
cd ./FluidFramework/tools/generator-fluid
npm install
npm link
```

:::
::::


This will install yo fluid along with its dependency, [Yeoman](https://yeoman.io/).

Yo fluid is now ready. Use it to scaffold a new component by typing `yo @microsoft/fluid` and following the instructions.

::: tip

For yo fluid setup issues see [this question on Microsoft Stack
Overflow](https://stackoverflow.microsoft.com/questions/137930/npm-install-fails-with-auth-issues/137931#137931)

:::


## Next steps

Now that you've used yo fluid to scaffold a new component, you should examine the contents of the yo fluid output, which
is a sample component called **diceroller**. See the [Dice roller tutorial](../examples/dice-roller.md) for a
step-by-step explanation of the code.

Or you can jump right in to building your own component using the scaffold as a base.

## Source code

The source code for the yo fluid generator can be found at
<https://github.com/Microsoft/FluidFramework/blob/master/tools/generator-fluid/>.