# Design Guidelines: Care Worker Shift Scheduling App

## Design Approach
**Selected Approach:** Design System (Material Design) with inspiration from Linear and Google Calendar
**Justification:** This is a utility-focused productivity tool where speed, clarity, and reliability are paramount. The app needs consistent, touch-friendly interactions optimized for mobile use with clear visual feedback.

## Core Design Principles
1. **Speed First:** Every interaction should require minimal taps - one-tap shift addition is the primary goal
2. **Visual Clarity:** Color-coding and clear typography ensure instant shift recognition
3. **Mobile-Optimized:** Touch targets sized appropriately (minimum 44x44px), thumb-friendly placement
4. **Consistent Feedback:** Clear visual states for all interactions

## Typography
**Font Family:** Inter (via Google Fonts CDN)
- **Headings:** Inter Semi-Bold (600)
  - Week Header: 24px / 1.5rem
  - Day Labels: 16px / 1rem
  - Section Headers: 20px / 1.25rem
- **Body Text:** Inter Regular (400)
  - Shift Times: 14px / 0.875rem
  - Category Labels: 13px / 0.8125rem
  - Buttons: 15px / 0.9375rem (Medium/500 weight)
- **Hierarchy:** Use weight and size contrast rather than color to establish hierarchy

## Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Micro spacing (gaps, padding): p-2, gap-2
- Standard spacing (cards, sections): p-4, gap-4, mb-6
- Major spacing (sections): py-8, mb-8
- Container padding: px-4

**Grid System:**
- Mobile: Single column, full width with px-4 margins
- Calendar grid: 7-column grid for week view
- Max-width container: max-w-2xl for optimal mobile readability

## Component Library

### Navigation & Header
**Top Bar:**
- Fixed position header with week navigation
- Left arrow (previous week), center (current week display), right arrow (next week)
- "Today" button for quick return to current week
- Height: h-16 with shadow for depth

### Calendar View
**Week Calendar Grid:**
- 7-column grid displaying Mon-Sun
- Each day cell shows:
  - Day name (top, small, uppercase)
  - Date number (large, prominent)
  - Shift blocks stacked vertically
- Active day indicator: border or subtle background
- Past days: reduced opacity (60%)

**Day Cell Structure:**
- Minimum height to accommodate 2-3 shifts
- Tap entire cell to open quick-add modal
- Visual hierarchy: Date > Shifts > Empty state

### Shift Components
**Shift Block Card:**
- Compact card showing:
  - Time range (bold)
  - Category badge (PE Home or Paul)
- Left border accent (4px) in category color
- Tap to edit/delete
- Minimal padding: p-2

**Quick-Add Interface:**
- Modal/bottom sheet appearing on day tap
- 4 large, touch-friendly shift buttons (one per time slot):
  - "6am - 7am"
  - "7am - 3pm"
  - "3pm - 11pm"  
  - "11pm - 12am"
- Each button shows time clearly
- Category toggle buttons below: "PE Home" | "Paul"
- Single tap on time + category = instant shift creation
- Close/cancel option

**Shift Buttons:**
- Full-width on mobile
- Height: h-14 for easy tapping
- Clear time labels, centered
- Active state shows selected time slot
- Spacing between buttons: gap-2

### Category System
**Category Indicators:**
- Two distinct category colors for PE Home vs Paul
- Category badge within shift cards
- Toggle switches for category selection in quick-add
- Color-coded left border on shift cards

### Action Buttons
**Primary Actions:**
- Large, full-width buttons in modals: h-12
- Secondary actions: outlined style, h-10
- Destructive actions (delete): clearly distinguished

**Icon Usage:**
- Heroicons for navigation (chevrons, calendar, plus)
- Icons at 20px/24px sizes
- Always paired with labels for clarity

### Modal/Bottom Sheets
**Quick-Add Modal:**
- Slides up from bottom on mobile
- Rounded top corners: rounded-t-2xl
- Contains shift time buttons + category selection
- Backdrop overlay for focus
- Easy dismiss (tap outside or close button)

**Edit/Delete Modal:**
- Appears when tapping existing shift
- Shows shift details
- Edit and Delete actions clearly separated
- Confirmation for destructive actions

### Empty States
**No Shifts Scheduled:**
- Centered message in day cell
- Subtle icon (calendar outline)
- Encouraging copy: "Tap to add shift"

### Week Navigation
**Controls:**
- Prominent arrows for previous/next week
- Week range display: "Dec 18 - Dec 24, 2024"
- Smooth transition when changing weeks
- "Today" quick-jump always accessible

## Responsive Behavior
**Mobile (default):**
- Full-width calendar grid with compact cells
- Bottom sheet modals for all interactions
- Vertical scrolling for week view
- Single column layout throughout

**Tablet/Desktop (md: and above):**
- Wider calendar cells with more breathing room
- Center modals instead of bottom sheets
- Max-width container: max-w-4xl
- Maintain mobile-first interactions (still optimized for touch)

## Animations
**Minimal, Purposeful Animations:**
- Modal entrance: slide-up (200ms ease-out)
- Shift addition: gentle fade-in (150ms)
- Week transition: slide left/right (250ms)
- No decorative or distracting animations
- All transitions: smooth, never jarring

## Accessibility
- All interactive elements minimum 44x44px tap targets
- Clear focus states for keyboard navigation
- ARIA labels for icon-only buttons
- Sufficient color contrast for all text
- Screen reader support for shift information
- Consistent tab order through interface

## Visual Hierarchy
1. **Primary:** Current week header, shift time blocks
2. **Secondary:** Day labels, category badges
3. **Tertiary:** Navigation arrows, empty states
4. **Emphasis through:** Size, weight, and strategic spacing—not color alone

This design creates a fast, reliable scheduling tool that prioritizes quick shift entry with minimal friction, clear visual organization, and mobile-optimized interactions.