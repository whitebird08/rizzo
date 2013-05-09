require.config
  paths:
    # Include the GPT js via require so that we *know* it's loaded when it's meant to be used below.
    'gpt': "//www.googletagservices.com/tag/js/gpt"

  waitSeconds: 40

require ['public/assets/javascripts/lib/core/ad_manager'], (adManager) ->

  describe 'adManager', ->

    it 'is defined', ->
      expect(adManager).toBeDefined()

    it 'has loaded the GPT js', ->
      expect(window.googletag).toBeDefined()

    describe 'initializing', ->

      beforeEach ->
        loadFixtures 'adBoxes.html'
        # Possible ad types are: adSense, trafficDriver, sponsorTile, oneByOne, leaderboard, mpu
        window.lp.ads.toDisplay = ["leaderboard", "leaderboard", "mpu", "trafficDriver", "adSense"]
        adManager.init()

      it 'creates a `cmd` array', ->
        expect(googletag.cmd).toBeDefined()

      it 'knows which types of ads to show', ->
        expect(lp.ads.toDisplay).toBeDefined()

      it 'knows the network code', ->
        expect(lp.ads.networkCode).toBeDefined()

      it 'has at least 1 layer defined', ->
        expect(lp.ads.layers.length > 0).toBe(true)

      # There's a problem with this test at the moment which *appears* to be happening because
      #   The google gpt lib is keeps an array of which elements have already been set up as
      #   ad slots. Since the AdManager.init() happens before each test, the second time it runs,
      #   the js-ad-leaderboard-0 slot was already taken by previous tests.
      # Will uncomment once we can think of a viable way to test this.
      # it 'creates a unique id for each of the elements', ->
      #   allUnique = true

      #   $("[id^=\"js-ad-\"]").each ->
      #     # If it doesn't end with `-` and a number or there is more than one with this id.
      #     if !/\-[0-9+]$/.test(this.id) or $('[id="'+this.id+'"]').length > 1
      #       allUnique = false
      #       return

      #   expect(allUnique).toBe(true)

      # This test is also failing because of the above. AdManager only gets as far as the first
      #   leaderboard element and then the gpt lib bombs out.
      # it 'loads the ads', ->
      #   waitsFor ->
      #     # The ads are loaded into iframes in the containers. NOTE: use `>=` because sometimes, GPT will add an additional 'hidden' one (who knows why)
      #     $(".ad-container > div iframe").length >= $(".ad-container > div").length
      #   , "ads to be loaded into the expected divs"