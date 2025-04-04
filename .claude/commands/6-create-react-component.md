---
title: 'Create React Component Task'
read_only: true
type: 'command'
---

# Create React Component

This task guides you through creating a new React component.

1. Ask the user what the component should be named

   - Ensure the name follows PascalCase convention

2. Ask where the component should be saved:

   1. Default location (apps/app/src/components)
   2. Custom location (ask for the path)

3. Ask what props the component should have:

   1. No props
   2. ChildrenProps and ClassNameProps
   3. ChildrenProps
   4. ClassNameProps

4. Ask if any extra imports are needed:

   1. No extra imports
   2. User specifies imports

5. Generate the component file based on the answers:
   - Create the proper TypeScript React component following project conventions
   - Use the appropriate imports based on the prop types selected
   - Add any additional imports requested
   - Follow the project's code style guidelines
   - Create the file in the specified location
   - If ClassNameProps required, return <Div className={[className]}></Div> (not <div>)
   - If ChildrenProprs required, return <Div>{children}</Div> (not <div>)
