// === GLOBAL VARIABLES ===
VAR player_name = "Explorer"
VAR has_key = false
VAR score = 0

Hello, {player_name}! Let's explore this Ink script.

-> main_menu

=== main_menu ===
Choose a feature to explore:
+ Knots and Stitches
    -> knots_and_stitches
+ Choices and Conditionals
    -> choices_and_conditionals
+ Variables and Diverts
    -> variables_and_diverts
+ End Demo
    -> end_demo

=== knots_and_stitches ===
# Knots & Stitches
This is a *knot*. Inside it, we can have multiple *stitches*.

-> knots_and_stitches.stitch_one

= stitch_one
This is the first stitch.
-> stitch_two

= stitch_two
This is the second stitch.
-> main_menu

=== choices_and_conditionals ===
# Choices & Conditionals
You find a mysterious door.

+ Try to open it
    {has_key:
        The door creaks open. Success!
        -> main_menu
    - else:
        It's locked. You need a key.
        -> main_menu
    }

+ Search for a key
    You found a key!
    ~ has_key = true
    -> main_menu

=== variables_and_diverts ===
# Variables & Diverts
Your current score is: {score}

+ Gain 5 points
    ~ score += 5
    -> show_score

+ Lose 3 points
    ~ score -= 3
    -> show_score

= show_score
Your new score is: {score}
-> main_menu

=== end_demo ===
# End Demo
This is the end of the demo
-> END