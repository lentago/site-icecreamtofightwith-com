#!/bin/bash
# Compile Ice Cream to Fight With from modular files
# Automatically finds all .md files in each directory - no hardcoded filenames

echo "Compiling book..."
echo ""

# Create/clear output file
: > Ice_Cream_to_Fight_With_COMPLETE.md

# Counter for stats
front_count=0
recipe_count=0
back_count=0

# Add front matter (all .md files in front_matter/, sorted)
if [ -d "front_matter" ]; then
    for file in front_matter/*.md; do
        if [ -f "$file" ]; then
            cat "$file" >> Ice_Cream_to_Fight_With_COMPLETE.md
            echo -e "\n\n---\n\n" >> Ice_Cream_to_Fight_With_COMPLETE.md
            echo "✓ Added: $file"
            ((front_count++))
        fi
    done
fi

# Add recipes (all .md files in recipes/, sorted)
if [ -d "recipes" ]; then
    for file in recipes/*.md; do
        if [ -f "$file" ]; then
            cat "$file" >> Ice_Cream_to_Fight_With_COMPLETE.md
            echo -e "\n\n---\n\n" >> Ice_Cream_to_Fight_With_COMPLETE.md
            echo "✓ Added: $file"
            ((recipe_count++))
        fi
    done
fi

# Add back matter (all .md files in back_matter/, sorted)
if [ -d "back_matter" ]; then
    for file in back_matter/*.md; do
        if [ -f "$file" ]; then
            cat "$file" >> Ice_Cream_to_Fight_With_COMPLETE.md
            echo -e "\n\n---\n\n" >> Ice_Cream_to_Fight_With_COMPLETE.md
            echo "✓ Added: $file"
            ((back_count++))
        fi
    done
fi

total=$((front_count + recipe_count + back_count))

echo ""
if [ $total -eq 0 ]; then
    echo "❌ No markdown files found!"
    echo "   Make sure you have front_matter/, recipes/, and back_matter/ directories"
else
    echo "✅ Book compiled successfully!"
    echo "   Output: Ice_Cream_to_Fight_With_COMPLETE.md"
    echo "   Front matter: $front_count files"
    echo "   Recipes: $recipe_count files"
    echo "   Back matter: $back_count files"
    echo "   Total: $total files"
fi
