import { CodeBlock } from "@arshad/ui/components/code-block";
import { A } from "@arshad/ui/components/prose/anchor";
import { Callout } from "@arshad/ui/components/prose/callout";
import { H2, H3 } from "@arshad/ui/components/prose/heading";
import { InlineCode } from "@arshad/ui/components/prose/inline-code";
import { Li, Ul } from "@arshad/ui/components/prose/list";
import { P } from "@arshad/ui/components/prose/paragraph";
import { Strong } from "@arshad/ui/components/prose/strong";
import { Table } from "@arshad/ui/components/prose/table";
import type { DatedArticle } from "@/lib/content";

const CONSOLE = `> 0.1 + 0.2
0.30000000000000004
> 0.1 + 0.2 === 0.3
false`;

const BITS = `sign  exponent     fraction
0     01111111011  1001100110011001100110011001100110011001100110011010`;

const ACCUMULATE = `let total = 0;
for (let i = 0; i < 10; i++) {
  total += 0.1;
}
total; // 0.9999999999999999

9007199254740992 + 1; // 9007199254740992`;

const FIXES = `const cents = 10 + 20; // 30, exact
cents / 100; // 0.3, for display only

(0.1 + 0.2).toFixed(2); // "0.30"

const close = (a, b, tolerance = 1e-9) =>
  Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));
close(0.1 + 0.2, 0.3); // true`;

export const floatingPoint = {
  slug: "floating-point",
  title: "Why 0.1 + 0.2 is not 0.3",
  description:
    "A decimal fraction rarely fits in binary, so the rounding happens when you write the number, not when you add it. Here is exactly where the extra digits come from.",
  date: "2026-09-12",
  body: (
    <>
      <P>
        Every programmer meets this one eventually. You open a console, add two of the simplest
        numbers there are, and the machine answers with a number that is wrong in the seventeenth
        place.
      </P>
      <CodeBlock code={CONSOLE} />
      <P>
        It looks like a bug in addition. It is not. The addition is exact to the last bit. The error
        was already there before the plus sign ran, because{" "}
        <Strong>neither 0.1 nor 0.2 can be written in binary</Strong>. What follows is where the
        extra 4 comes from, digit by digit, and what to do about it.
      </P>

      <H2>A decimal fraction rarely fits in binary</H2>
      <P>
        In decimal, a third has no finite form. You write 0.333… and stop somewhere, and the number
        you stored is a little less than a third. Binary has the same problem with different
        numbers. A fraction ends in binary only when its denominator is a power of two, and a tenth
        is not one of those. In binary, 0.1 is 0.0001100110011… with the 0011 repeating forever.
      </P>
      <Ul>
        <Li>0.5, 0.25, and 0.375 are exact, because they are halves, quarters, and eighths.</Li>
        <Li>0.1, 0.2, and 0.3 are not, because they are tenths.</Li>
        <Li>Neither is 0.7, 1.1, or almost any price you have ever typed into a form.</Li>
      </Ul>

      <H2>What the computer stores instead</H2>
      <P>
        JavaScript numbers, and doubles in nearly every other language, follow the{" "}
        <A href="https://en.wikipedia.org/wiki/Double-precision_floating-point_format">
          IEEE 754 double format
        </A>
        : 64 bits split into a sign, an 11 bit exponent, and a 52 bit fraction. The repeating
        pattern has to be cut off at bit 52 and rounded, and this is what 0.1 becomes.
      </P>
      <CodeBlock code={BITS} />
      <P>
        Read back as a decimal, that bit pattern is not a tenth. It is the nearest double to a
        tenth, which is a slightly different number. The same is true for the other two.
      </P>
      <Table
        head={["You write", "What is stored", "Off by"]}
        rows={[
          [
            <InlineCode key="in">0.1</InlineCode>,
            <InlineCode key="out">0.10000000000000000555…</InlineCode>,
            "+5.55 × 10⁻¹⁸",
          ],
          [
            <InlineCode key="in">0.2</InlineCode>,
            <InlineCode key="out">0.20000000000000001110…</InlineCode>,
            "+1.11 × 10⁻¹⁷",
          ],
          [
            <InlineCode key="in">0.3</InlineCode>,
            <InlineCode key="out">0.29999999999999998890…</InlineCode>,
            "−1.11 × 10⁻¹⁷",
          ],
        ]}
      />
      <P>
        Notice the signs. The nearest double to 0.1 sits above it, and so does the nearest double to
        0.2. The nearest double to 0.3 sits below it. That asymmetry is the whole story.
      </P>

      <H2>The sum lands on a tie</H2>
      <P>
        Add the two stored values exactly and you get 0.30000000000000001665…, which is not a double
        either. It has to be rounded to one of its two neighbours, 0.29999999999999998890… below or
        0.30000000000000004441… above. Measure the distance to each and they are{" "}
        <Strong>exactly equal</Strong>. The sum is a perfect tie.
      </P>
      <P>
        IEEE 754 breaks ties by choosing the neighbour whose last bit is even, and that is the upper
        one. So the sum becomes 0.30000000000000004441…, while the literal{" "}
        <InlineCode>0.3</InlineCode> you typed on the other side of the comparison became the lower
        one. Two different doubles, so <InlineCode>===</InlineCode> says false, and it is right to.
      </P>

      <H3>Why 0.1 still prints as 0.1</H3>
      <P>
        If 0.1 is stored as 0.10000000000000000555…, why does the console show 0.1? Because printing
        does not show the stored value. It shows the{" "}
        <Strong>shortest decimal that rounds back to the same double</Strong>. For the double
        nearest a tenth, that shortest decimal is 0.1. For the sum, 0.3 would round back to the
        other neighbour, so the printer has to keep going until the digits identify the right one,
        and that takes seventeen of them.
      </P>

      <H2>Where it bites</H2>
      <P>
        One rounding error of 10⁻¹⁷ never matters on its own. It matters when it is compared,
        accumulated, or multiplied into money.
      </P>
      <Ul>
        <Li>
          <Strong>Equality checks.</Strong> Any test of the form{" "}
          <InlineCode>a + b === c</InlineCode> on fractions is a coin flip.
        </Li>
        <Li>
          <Strong>Accumulation.</Strong> Adding 0.1 ten times does not give 1, and the error grows
          with every step.
        </Li>
        <Li>
          <Strong>Money.</Strong> Prices are decimal by law and by habit, and a cent that drifts is
          a bug a customer can see.
        </Li>
        <Li>
          <Strong>Big integers.</Strong> The 52 bit fraction also caps exact integers at 2⁵³. Above
          that, adding 1 can do nothing.
        </Li>
      </Ul>
      <CodeBlock code={ACCUMULATE} />

      <H2>What to do instead</H2>
      <P>
        The fix depends on what the number is for. Doubles are the right tool for measurements,
        geometry, and anything physical. They are the wrong tool for anything that has to come out
        to the cent.
      </P>
      <Ul>
        <Li>
          <Strong>Count in the smallest unit.</Strong> Store cents, not dollars, as integers. Every
          integer below 2⁵³ is exact, and so is every sum of them.
        </Li>
        <Li>
          <Strong>Round for display, never for arithmetic.</Strong> <InlineCode>toFixed</InlineCode>{" "}
          and <InlineCode>Intl.NumberFormat</InlineCode> produce strings for people to read. Do the
          maths before, on exact values.
        </Li>
        <Li>
          <Strong>Compare with a tolerance.</Strong> Two doubles are equal when their difference is
          small relative to their size. <InlineCode>Number.EPSILON</InlineCode> is the gap between 1
          and the next double, so it only works for numbers near 1. Scale it.
        </Li>
        <Li>
          <Strong>Use a decimal type when one exists.</Strong> Python has{" "}
          <InlineCode>decimal</InlineCode>, Java has <InlineCode>BigDecimal</InlineCode>, and
          JavaScript has a <A href="https://github.com/tc39/proposal-decimal">decimal proposal</A>{" "}
          on the way.
        </Li>
      </Ul>
      <CodeBlock code={FIXES} />
      <Callout>
        None of this is specific to JavaScript. Python, Java, C, Go, Rust, and every other language
        that uses IEEE 754 doubles gives 0.30000000000000004 for the same sum. A language that
        answers 0.3 is either using a decimal type or rounding before it prints.
      </Callout>
      <P>
        The thing to remember is where the rounding happened. Not in the addition, which was exact,
        but in the act of writing 0.1 down at all. Once you see the number as already rounded, every
        result that follows stops being surprising. For the long version, with every language’s
        output side by side, <A href="https://floating-point-gui.de">The Floating-Point Guide</A> is
        the reference.
      </P>
    </>
  ),
} satisfies DatedArticle;
